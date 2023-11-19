'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ServiceService =
  exports.generateServiceId =
  exports.findLastServiceId =
  exports.asyncForEach =
    void 0;
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const service_constant_1 = require('./service.constant');
const service_model_1 = require('./service.model');
const category_model_1 = require('../category/category.model');
const asyncForEach = (array, callback) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(array)) {
      throw new Error('Expected an array');
    }
    for (let index = 0; index < array.length; index++) {
      yield callback(array[index], index, array);
    }
  });
exports.asyncForEach = asyncForEach;
const findLastServiceId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastService = yield service_model_1.Service.findOne(
      {
        role: 'service',
      },
      { id: 1, _id: 0 },
    )
      .sort({
        createdAt: -1,
      })
      .lean();
    return (
      lastService === null || lastService === void 0 ? void 0 : lastService.id
    )
      ? lastService.id.substring(8)
      : undefined;
  });
exports.findLastServiceId = findLastServiceId;
const generateServiceId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastServiceId)()) ||
      (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `Service-${incrementedId}`;
    return incrementedId;
  });
exports.generateServiceId = generateServiceId;
const createService = service =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { categoryIds } = service;
    let createNewService = true;
    yield (0, exports.asyncForEach)(categoryIds, categoryId =>
      __awaiter(void 0, void 0, void 0, function* () {
        const alreadyExist = yield service_model_1.Service.findOne({
          categoryIds: categoryId,
        });
        const categoryExists = yield category_model_1.Category.exists({
          _id: categoryId,
        });
        if (alreadyExist || !categoryExists) {
          createNewService = false;
        }
      }),
    );
    if (createNewService) {
      const id = yield (0, exports.generateServiceId)();
      service.id = id;
      const result = yield service_model_1.Service.create(service);
      console.log(result);
      return result;
    } else {
      return null;
    }
  });
const getSingleService = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findOne({ id }).populate(
      'categoryIds',
    );
    return result;
  });
const getAllServices = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions,
      );
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
      andConditions.push({
        $or: service_constant_1.serviceSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
    // Dynamic sort needs  fields to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    // If there is no condition , put {} to give all data
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield service_model_1.Service.find(whereConditions)
      .populate('categoryIds')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total = yield service_model_1.Service.countDocuments(whereConditions);
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const updateService = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      },
    );
    return result;
  });
const deleteService = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findOneAndDelete({ id });
    return service;
  });
exports.ServiceService = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};

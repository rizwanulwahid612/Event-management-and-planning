#Admin: userid: A-00001, password:123456
#user/customer : C-00001, password:123456
#Super_Admin: S-00001, password:123456
frontend livelink:https://nextjs-front-end-event-management-and-planning-fccq4pt0z.vercel.app
backend livelink:https://event-management-and-planning-955nyypit.vercel.app/api/v1
PORT=3005
BACKEND_URL=http://localhost:3005/api/v1
NODE_ENV=development
FRONTEND_URL=https://localhost:3000
DATABASE_URL=mongodb+srv://event-management:LuIxsoyOHin6Gdar@cluster0.d6f547g.mongodb.net/event-management?retryWrites=true&w=majority
BCRYPT_SALT_ROUNDS=12
JWT_SECRET="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDAxIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA0NjI2MDk0LCJleHAiOjE3MDU0OTAwOTR9.M00iBu2riHiHYBGBPFdtZbU6pAvYVo9fk0I1cFXleQg"
JWT_REFRESH_SECRET="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDAxIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA0NjI2MDk0LCJleHAiOjE3MDcyMTgwOTR9.o1aVvZjIaDNMcEmHTNMON_mgu4bfT4Xd5U-OAxm4huE"
JWT_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d

import instance from ".";
import jwt_decode from jwt-decode;



const login = async (userInfo) => {
  try{
  const { data } = await instance.post("/auth/login", userInfo);
  storeToken(data.token); 
    return data;
  } catch (error) {
    console.log(error);
  }
};

const register = async (userInfo) => {
  try{
const formData = new FormData();

for (const key in userInfo) ;
formData.append(key, userInfo[key]);
  const {data} = await instance.post("/auth/register", data);
  storeToken(data.token); 
  return data;
} catch (error) {
  console.log(error);
}
};


const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};


const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwt_decode(token);
    const cureentTime = Date.now() / 1000;
    if (decode.exp < cureentTime) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  }
  return false;
};


const logout = () => {
  localStorage.removeItem("token");
};

export { login, register, me, getAllUsers,checkToken,logout };

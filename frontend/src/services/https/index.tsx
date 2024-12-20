import { CodeInterface } from "../../interfaces/Code";
import { SignInInterface } from "../../interfaces/SignIn";
import { UserInterface } from "../../interfaces/User";

import axios from "axios";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");


const requestOptions = {

  headers: {

    "Content-Type": "application/json",

    Authorization: `${Bearer} ${Authorization}`,

  },

};

async function SignIn(data: SignInInterface) {

  return await axios

    .post(`${apiUrl}/signin`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateCode(data: CodeInterface) {

return await axios
  
    .post(`${apiUrl}/codes`, data, requestOptions)
  
    .then((res) => res)
  
    .catch((e) => e.response);
  
}

async function GetCodes() {

  return await axios

    .get(`${apiUrl}/codes`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetCodesById(id: Number | undefined) {

  return await axios

    .get(`${apiUrl}/codes/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function UpdateCode(data: CodeInterface) {

  return await axios

    .put(`${apiUrl}/codes/${data.ID}`, data, requestOptions)  // เพิ่ม ${data.ID} ใน URL

    .then((res) => res)
    
    .catch((e) => e.response);
}



async function DeleteCodeById(id: Number | undefined) {

  return await axios

    .delete(`${apiUrl}/codes/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateUser(data: UserInterface) {

  return await axios

    .post(`${apiUrl}/signup`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateAdmin(data: UserInterface) {

  return await axios

    .post(`${apiUrl}/signupadmin`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetUsers() {

  return await axios

    .get(`${apiUrl}/users`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetAdmin() {

  return await axios

    .get(`${apiUrl}/admins`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function GetUsersById(id: string) {

  return await axios

    .get(`${apiUrl}/user/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function UpdateUsersById(id: string, data: UserInterface) {

  return await axios

    .put(`${apiUrl}/user/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function DeleteUsersById(id: string) {

  return await axios

    .delete(`${apiUrl}/user/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}



export {

    CreateCode,
    GetCodes,
    GetCodesById,
    UpdateCode,
    DeleteCodeById,
    SignIn,
    CreateUser,
    CreateAdmin,
    GetUsers,
    GetAdmin,
    GetUsersById,
    UpdateUsersById,
    DeleteUsersById,
    

};
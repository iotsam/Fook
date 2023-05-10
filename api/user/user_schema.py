from pydantic import BaseModel


class UserCreate(BaseModel):
    password: str
    username: str
    name: str
    phonenumber: str
    email: str
    birth: str


class Token(BaseModel):
    access_token: str
    token_type: str
    username: str


class UserUpdate(BaseModel):
    name: str
    phonenumber: str
    email: str
    birth: str


class PasswordUpdate(BaseModel):
    password: str

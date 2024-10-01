from pydantic import BaseModel, EmailStr
from datetime import datetime

# Shared properties
class UserBase(BaseModel):
    username: str
    fullname: str
    email: EmailStr

# Properties to receive on user creation
class UserCreate(UserBase):
    password: str

# Properties to return via API
class UserResponse(UserBase):
    created: datetime

    class Config:
        orm_mode = True

# Properties to receive via API on login
class LoginRequest(BaseModel):
    username: str
    password: str

# Token model
class Token(BaseModel):
    access_token: str
    token_type: str
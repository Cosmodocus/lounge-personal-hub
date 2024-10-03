from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from app.schemas.user import UserCreate, UserResponse, LoginRequest, Token
from app.core.auth import hash_password, verify_password, create_access_token
from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES
from app.db.database import get_db
from app.db.models import User
from app.core.auth import get_current_user

router = APIRouter()

# User Registration Endpoint
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
from app.schemas.user import UserCreate, UserResponse
from app.core.auth import hash_password
from app.db.database import get_db
from app.db.models import User

router = APIRouter()

@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(
        (User.username == user.username) | (User.email == user.email)
    ).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered",
        )
    # Hash the password
    hashed_password = hash_password(user.password)

    # Create a new user instance
    new_user = User(
        username=user.username,
        fullname=user.fullname,
        email=user.email,
        hashed_password=hashed_password,
        created=datetime.utcnow()
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Return the user details and the success message
    return {
        "user": new_user,
        "message": "Registration successful!"
    }



# User Login Endpoint
@router.post("/login", response_model=Token)
def login_for_access_token(login: LoginRequest, db: Session = Depends(get_db)):
    # Authenticate user
    user = db.query(User).filter(User.username == login.username).first()
    if not user or not verify_password(login.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # Create JWT token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Test route to verify JWT authentication
@router.get("/protected")
def read_protected_data(current_user: User = Depends(get_current_user)):
    return {
        "message": "This is a protected route.",
        "username": current_user.username
    }

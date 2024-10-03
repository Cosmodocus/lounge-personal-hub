from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class User(Base):
    __tablename__ = 'users'

    username = Column(String(20), primary_key=True)
    fullname = Column(String(40), nullable=False)
    email = Column(String(40), nullable=False)
    hashed_password = Column(String(256), nullable=False)
    created = Column(DateTime, default=func.now())

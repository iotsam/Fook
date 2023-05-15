from passlib.context import CryptContext
from sqlalchemy.dialects.mysql import LONGTEXT
from sqlalchemy import Column, TEXT, BIGINT, VARCHAR, DATETIME, BOOLEAN
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
pwd_content = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(Base):
    __tablename__ = "user"

    id = Column(BIGINT, nullable=False, autoincrement=True, primary_key=True)
    username = Column(TEXT, nullable=False)
    password = Column(TEXT, nullable=False)
    name = Column(TEXT, nullable=False)
    phonenumber = Column(TEXT, nullable=False)
    email = Column(TEXT, nullable=False)
    birth = Column(TEXT, nullable=False)


class Questionboard(Base):
    __tablename__ = "questionboard"

    id = Column(BIGINT, primary_key=True, nullable=False, autoincrement=True)
    username = Column(TEXT, nullable=False)
    subject = Column(VARCHAR, nullable=False)
    content = Column(TEXT, nullable=False)
    create_date = Column(DATETIME, nullable=False)


class Comment(Base):
    __tablename__ = "comment"

    id = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    username = Column(TEXT, nullable=False)
    comment = Column(TEXT, nullable=False)
    pri = Column(BOOLEAN, nullable=False)
    create_date = Column(DATETIME, nullable=False)
    pageid = Column(BIGINT, nullable=False)


class Recipe(Base):
    __tablename__ = "recipeboard"

    id = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    username = Column(TEXT, nullable=False)
    subject = Column(VARCHAR, nullable=False)
    content = Column(TEXT, nullable=False)
    imageurl = Column(TEXT, nullable=False)
    create_date = Column(DATETIME, nullable=False)
    pageid = Column(BIGINT, nullable=False)


class Images(Base):
    __tablename__ = "image"

    id = Column(BIGINT, nullable=False, autoincrement=True, primary_key=True)
    filename = Column(TEXT, nullable=False)
    url = Column(TEXT, nullable=False)

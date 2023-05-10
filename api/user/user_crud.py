from passlib.context import CryptContext
from sqlalchemy.orm import Session
from models import User
from fastapi import HTTPException, Depends

from api.user.user_schema import UserCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_user(db: Session, user_create: UserCreate):
    db_user = User(
        username=user_create.username,
        password=pwd_context.hash(user_create.password),
        name=user_create.name,
        phonenumber=user_create.phonenumber,
        email=user_create.email,
        birth=user_create.birth,
    )
    db.add(db_user)
    db.commit()
    # 회원데이터 저장


def get_existing_user(db: Session, user_create: UserCreate):
    return (
        db.query(User)
        .filter(
            (User.username == user_create.username) | (User.email == user_create.email)
        )
        .first()
    )


# username 또는 email로 등록된 사용자가 있는지 조회하는 get_existing_user 함수


def get_user(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


# 사용자명으로 사용자 모델 객체를 리턴하는 get_user 함수


async def update_user(
    username: str, name: str, email: str, birth: str, phonenumber: str, db: Session
):
    db_user = db.query(User).filter(User.username == username).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.name = name
    db_user.email = email
    db_user.phonenumber = phonenumber
    db_user.birth = birth

    db.commit()
    db.refresh(db_user)
    return {"message": "Successfully updated user"}


async def update_password(username: str, password: str, db: Session):
    db_user = db.query(User).filter(User.username == username).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.password = pwd_context.hash(password)
    if db_user.password == pwd_context.hash(password):
        raise HTTPException(status_code=404, detail="Duplicated Password")

    db.commit()
    db.refresh(db_user)
    return {"message": "Successfully updated user"}

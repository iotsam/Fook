from passlib.context import CryptContext
from sqlalchemy.dialects.mysql import LONGTEXT
from sqlalchemy import (
    Column,
    TEXT,
    BIGINT,
    VARCHAR,
    DATETIME,
    BOOLEAN,
    Integer,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Like(Base):
    __tablename__ = "like"

    question_id = Column(Integer, ForeignKey("questionboard.id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"), primary_key=True)

    question = relationship("Questionboard", backref="likes")
    user = relationship("User", backref="liked_likes")  # 변경된 역참조 이름


class RecipeLike(Base):
    __tablename__ = "recipe_like"

    recipe_id = Column(Integer, ForeignKey("recipeboard.id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"), primary_key=True)

    recipe = relationship("Recipe", backref="recipe_likes")
    user = relationship("User", backref="recipe_liked_likes")


class User(Base):
    __tablename__ = "user"

    id = Column(BIGINT, nullable=False, autoincrement=True, primary_key=True)
    username = Column(TEXT, nullable=False)
    password = Column(TEXT, nullable=False)
    name = Column(TEXT, nullable=False)
    phonenumber = Column(TEXT, nullable=False)
    email = Column(TEXT, nullable=False)
    birth = Column(TEXT, nullable=False)

    liked_questions = relationship(
        "Questionboard",
        secondary=Like.__table__,
        backref="user_liked",
        cascade="all, delete",
    )
    liked_recipe = relationship(
        "Recipe",
        secondary=RecipeLike.__table__,
        backref="recipe_user_liked",
        cascade="all, delete",
    )


class Questionboard(Base):
    __tablename__ = "questionboard"

    id = Column(BIGINT, primary_key=True, nullable=False, autoincrement=True)
    username = Column(TEXT, nullable=False)
    subject = Column(VARCHAR, nullable=False)
    content = Column(LONGTEXT, nullable=False)
    create_date = Column(DATETIME, nullable=False)
    like_count = Column(Integer, nullable=False, default=0)

    liked_likes = relationship(
        "User",
        secondary=Like.__table__,
        backref="question_liked",
        cascade="all, delete",
    )  # 변경된 역참조 이름


class Recipe(Base):
    __tablename__ = "recipeboard"

    id = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    username = Column(TEXT, nullable=False)
    subject = Column(VARCHAR, nullable=False)
    content = Column(TEXT, nullable=False)
    create_date = Column(DATETIME, nullable=False)
    like_count = Column(Integer, nullable=False, default=0)

    recipe_liked_likes = relationship(
        "User",
        secondary=RecipeLike.__table__,
        backref="recipe_liked",
        cascade="all, delete",
    )  # 변경된 역참조 이름


class Comment(Base):
    __tablename__ = "comment"

    id = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    username = Column(TEXT, nullable=False)
    comment = Column(TEXT, nullable=False)
    pri = Column(BOOLEAN, nullable=False)
    create_date = Column(DATETIME, nullable=False)
    pageid = Column(BIGINT, nullable=False)
    parentid = Column(BIGINT, nullable=False)


class RecipeComment(Base):
    __tablename__ = "recipe_comment"

    id = Column(BIGINT, primary_key=True, autoincrement=True, nullable=False)
    username = Column(TEXT, nullable=False)
    comment = Column(TEXT, nullable=False)
    pri = Column(BOOLEAN, nullable=False)
    create_date = Column(DATETIME, nullable=False)
    pageid = Column(BIGINT, nullable=False)
    parentid = Column(BIGINT, nullable=False)


class Images(Base):
    __tablename__ = "image"

    id = Column(BIGINT, nullable=False, autoincrement=True, primary_key=True)
    filename = Column(TEXT, nullable=False)
    url = Column(TEXT, nullable=False)


class Noticeboard(Base):
    __tablename__ = "noticeboard"

    id = Column(BIGINT, primary_key=True, nullable=False, autoincrement=True)
    username = Column(TEXT, nullable=False)
    subject = Column(VARCHAR, nullable=False)
    content = Column(LONGTEXT, nullable=False)
    create_date = Column(DATETIME, nullable=False)

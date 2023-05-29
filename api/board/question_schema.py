from datetime import datetime
from pydantic import BaseModel, validator
from models import User
from typing import List


class QuestionCreate(BaseModel):
    subject: str
    content: str
    create_date: datetime
    liker: List[int] = []


class QuestionUpdate(BaseModel):
    subject: str
    content: str
    create_date: datetime


class QuestionDelete(BaseModel):
    question_id: int


class Image(BaseModel):
    url: str


class QuestionLike(BaseModel):
    question_id: int

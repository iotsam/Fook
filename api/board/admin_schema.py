from datetime import datetime
from pydantic import BaseModel, validator
from models import User
from typing import List


class NoticeCreate(BaseModel):
    subject: str
    content: str
    create_date: datetime


class NoticeUpdate(BaseModel):
    subject: str
    content: str
    create_date: datetime


class NoticeDelete(BaseModel):
    question_id: int


class Image(BaseModel):
    url: str

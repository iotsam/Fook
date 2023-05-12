from datetime import datetime
from pydantic import BaseModel, validator


class QuestionCreate(BaseModel):
    subject: str
    content: str
    create_date: datetime


class QuestionUpdate(BaseModel):
    subject: str
    content: str
    create_date: datetime


class QuestionDelete(BaseModel):
    question_id: int

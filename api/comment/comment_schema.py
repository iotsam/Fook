from pydantic import BaseModel
from datetime import datetime


class CommentCreate(BaseModel):
    username: str
    comment: str
    pri: bool
    create_date: datetime
    pageid: int


class CommentUpdate(BaseModel):
    comment: str
    create_date: datetime

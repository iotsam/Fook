from pydantic import BaseModel
from datetime import datetime


class RecipeCreate(BaseModel):
    username: str
    subject: str
    content: str
    imageurl: str
    create_date: datetime
    pageid: int

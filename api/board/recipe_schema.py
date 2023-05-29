from datetime import datetime
from pydantic import BaseModel, validator
from models import User
from typing import List


class RecipeCreate(BaseModel):
    subject: str
    content: str
    create_date: datetime
    liker: List[int] = []


class RecipeUpdate(BaseModel):
    subject: str
    content: str
    create_date: datetime


class RecipeDelete(BaseModel):
    recipe_id: int


class Image(BaseModel):
    url: str


class RecipeLikes(BaseModel):
    recipe_id: int

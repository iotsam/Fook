from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from database import get_db
from models import Recipe
from api.recipe.recipe_schema import RecipeCreate
import boto3

router = APIRouter(
    prefix="/api/recipe",
)

S3_BUCKET_NAME = "learntest11"
S3_ACCESS_KEY = "AKIAZF522S5L7KDOXYXL"
S3_SECRET_KET = "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"
S3_REGION = "ap-northeast-2"

s3_client = boto3.client(
    "s3",
    aws_access_key_id=S3_ACCESS_KEY,
    aws_secret_access_key=S3_SECRET_KET,
    region_name=S3_REGION,
)


@router.post("/{username}/create", tags=["Recipe"], status_code=status.HTTP_201_CREATED)
def create_recipe(
    Recipe_Create: RecipeCreate,
    db: Session = Depends(get_db),
):
    recipe = Recipe(
        username=Recipe_Create.username,
        subject=Recipe_Create.subject,
        content=Recipe_Create.content,
        imageurl=Recipe_Create.imageurl,
        create_date=Recipe_Create.create_date,
        pageid=Recipe_Create.pageid,
    )
    if not recipe:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Recipe not found"
        )
    db.add(recipe)
    db.commit()

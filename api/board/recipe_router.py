from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from starlette import status
from database import get_db
from models import Questionboard, User, RecipeLike, Recipe
from api.board.recipe_schema import (
    RecipeCreate,
    RecipeUpdate,
    RecipeLikes,
)


router = APIRouter(
    prefix="/api/recipe",
)


@router.post("/{username}/createboard", tags=["Recipe"], status_code=status.HTTP_200_OK)
def create_question(
    username: str, recipe_Create: RecipeCreate, db: Session = Depends(get_db)
):
    db_createrecipe = Recipe(
        username=username,
        subject=recipe_Create.subject,
        content=recipe_Create.content,
        create_date=recipe_Create.create_date,
    )
    db.add(db_createrecipe)
    db.commit()


@router.get("/getboard", tags=["Recipe"])
def get_recipe(db: Session = Depends(get_db)):
    db_recipe = db.query(Recipe).all()
    return db_recipe


@router.get("/detail/{username}", tags=["UserInfo"], status_code=status.HTTP_200_OK)
def my_detail(username: str, db: Session = Depends(get_db)):
    detail = db.query(Recipe).filter(Recipe.username == username).all()
    return detail


@router.patch(
    "/update/{username}/{id}", tags=["Recipe"], status_code=status.HTTP_200_OK
)
def recipe_update(
    username: str,
    id: int,
    recipe_update: RecipeUpdate,
    db: Session = Depends(get_db),
):
    recipe = (
        db.query(Recipe).filter(Recipe.username == username, Recipe.id == id).first()
    )

    if not recipe:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Question not found"
        )

    update_data = recipe_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(recipe, key, value)

    db.commit()
    db.refresh(recipe)
    return {"message": "Successfully updated question"}


# 게시물 삭제기능
@router.delete("/delete/{id}", tags=["Recipe"])
def delete_board(id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == id).first()
    if not recipe:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    all_remove_like(db, recipe)
    db.delete(recipe)
    db.commit()


def all_remove_like(db: Session, recipe: Recipe):
    # Find all likes associated with the given question
    likes = db.query(RecipeLike).filter(RecipeLike.recipe_id == recipe.id).all()

    # Remove each like from the database
    for like_entry in likes:
        db.delete(like_entry)

    # Update the like count of the question to reflect the removal of likes
    recipe.like_count = 0

    # Commit the changes to the database
    db.commit()


# 게시물 좋아요 기능
@router.post("/like", tags=["Like"], status_code=status.HTTP_200_OK)
def recipe_like(user_id: int, recipe_like: RecipeLikes, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_like.recipe_id).first()
    if not recipe:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="데이터를 찾을 수 없습니다."
        )
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="사용자를 찾을 수 없습니다."
        )

    add_like(db, recipe, user)


def add_like(db: Session, recipe: Recipe, user: User):
    recipe.recipe_liked_likes.append(user)
    recipe.like_count = len(recipe.recipe_likes)
    db.commit()


# 게시물 좋아요 해제 기능
@router.delete("/removelike", tags=["Like"], status_code=status.HTTP_200_OK)
def question_unlike(
    user_id: int, recipe_like: RecipeLikes, db: Session = Depends(get_db)
):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_like.recipe_id).first()
    if not recipe:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="데이터를 찾을 수 없습니다."
        )
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="사용자를 찾을 수 없습니다."
        )

    remove_like(db, recipe, user)


def remove_like(db: Session, recipe: Recipe, user: User):
    recipe.recipe_liked_likes.remove(user)
    recipe.like_count = len(recipe.recipe_likes)
    db.commit()


# 게시물 카운터
@router.get("/likeCount", tags=["Like"], status_code=status.HTTP_200_OK)
def get_like_count(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="데이터를 찾을 수 없습니다."
        )
    return {"likeCount": recipe.like_count}

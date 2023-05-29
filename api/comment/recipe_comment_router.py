from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from database import get_db
from models import RecipeComment
from api.comment.recipe_comment_schema import CommentCreate, CommentUpdate

router = APIRouter(
    prefix="/api/recipecomment",
)


@router.post(
    "/{username}/create", tags=["RecipeComment"], status_code=status.HTTP_201_CREATED
)
def create_comment(
    Comment_Create: CommentCreate,
    db: Session = Depends(get_db),
):
    comment = RecipeComment(
        username=Comment_Create.username,
        comment=Comment_Create.comment,
        pri=Comment_Create.pri,
        create_date=Comment_Create.create_date,
        pageid=Comment_Create.pageid,
        parentid=Comment_Create.parentid,
    )
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found"
        )
    db.add(comment)
    db.commit()


@router.get(
    "/getcomment/{username}",
    tags=["RecipeComment"],
    status_code=status.HTTP_202_ACCEPTED,
)
def get_comment(db: Session = Depends(get_db)):
    comment = db.query(RecipeComment).all()
    return comment


@router.delete("/delete/{id}", tags=["RecipeComment"])
def delete_comment(id: int, db: Session = Depends(get_db)):
    comment = db.query(RecipeComment).filter(RecipeComment.id == id).first()
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found"
        )
    db.delete(comment)
    db.commit()
    return {"message": "Comment deleted successfully"}


@router.patch("/update/{id}", tags=["RecipeComment"], status_code=status.HTTP_200_OK)
def question_update(
    id: int,
    comment_update: CommentUpdate,
    db: Session = Depends(get_db),
):
    comment = db.query(RecipeComment).filter(RecipeComment.id == id).first()

    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Question not found"
        )

    update_data = comment_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(comment, key, value)

    db.commit()
    db.refresh(comment)
    return {"message": "Successfully updated question"}

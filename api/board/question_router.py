from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from starlette import status
from database import get_db
from models import Questionboard
from api.board.question_schema import QuestionCreate, QuestionUpdate, Image
from fastapi.responses import JSONResponse, FileResponse
import boto3
from io import BytesIO


router = APIRouter(
    prefix="/api/board",
)


# s3 = boto3.client(
#     "s3",
#     aws_access_key_id=S3_ACCESS_KEY,
#     aws_secret_access_key=S3_SECRET_KET,
#     region_name=S3_REGION,
# )


@router.post(
    "/{username}/createboard", tags=["QAboard"], status_code=status.HTTP_200_OK
)
def create_question(
    username: str, question_Create: QuestionCreate, db: Session = Depends(get_db)
):
    db_createboard = Questionboard(
        username=username,
        subject=question_Create.subject,
        content=question_Create.content,
        create_date=question_Create.create_date,
    )
    db.add(db_createboard)
    db.commit()


@router.get("/getboard", tags=["QAboard"])
def get_question(db: Session = Depends(get_db)):
    db_board = db.query(Questionboard).all()
    return db_board


@router.get("/detail/{username}", tags=["UserInfo"], status_code=status.HTTP_200_OK)
def my_detail(username: str, db: Session = Depends(get_db)):
    detail = db.query(Questionboard).filter(Questionboard.username == username).all()
    return detail


@router.patch("/update/{username}/{id}", status_code=status.HTTP_200_OK)
def question_update(
    username: str,
    id: int,
    question_update: QuestionUpdate,
    db: Session = Depends(get_db),
):
    question = (
        db.query(Questionboard)
        .filter(Questionboard.username == username, Questionboard.id == id)
        .first()
    )

    if not question:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Question not found"
        )

    update_data = question_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(question, key, value)

    db.commit()
    db.refresh(question)
    return {"message": "Successfully updated question"}


# 게시물 삭제기능
@router.delete("/delete/{id}", tags=["QAboard"])
def delete_board(id: int, db: Session = Depends(get_db)):
    id = db.query(Questionboard).filter(Questionboard.id == id).first()
    if not id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    db.delete(id)
    db.commit()


# 이미지 업로드 관련 AWS
# @router.post("/uploadfile")
# async def upload_image(image: UploadFile = File(...)):
#     content = await image.read()
#     # 이미지를 S3에 업로드합니다.
#     s3 = boto3.client(
#         "s3",
#         aws_access_key_id=S3_ACCESS_KEY,
#         aws_secret_access_key=S3_SECRET_KET,
#         region_name=S3_REGION,
#     )
#     s3_object = s3.put_object(Body=content, Bucket=S3_BUCKET_NAME, Key=image.filename)
#     # S3에서 이미지 URL을 생성합니다.
#     image_url = s3.generate_presigned_url(
#         "get_object",
#         Params={"Bucket": S3_BUCKET_NAME, "Key": image.filename},
#         ExpiresIn=3600,
#     )
#     return {"url": image_url}


# @router.post("/uploadfile/")
# async def create_upload_file(file: UploadFile = File(...)):
#     file_path = os.path.join("uploads", file.filename)
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)
#     return {"filename": file.filename}


# @router.get("/image/{filename}")
# async def read_file(filename):
#     file_path = os.path.join("uploads", filename)
#     return FileResponse(file_path)


# with open(f"{file.filename}", "wb") as buffer:
#     buffer.write(file.file.read())

# # 이미지 리사이징
# with Image.open(file.filename) as im:
#     size = (800, 800)
#     im_resized = im.resize(size)
#     im_resized.save(f"{file.filename}")

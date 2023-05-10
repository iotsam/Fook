from datetime import datetime
from sqlalchemy.orm import Session


# def get_question_list(db: Session):
#     question_list = db.query(questionCreate)\
#         .order_by(questionCreate.create_date.desc())\
#         .all()
#     return question_list
#
# def get_question(db: Session, question_id: int):
#     question = db.query(questionCreate).get(question_id)
#     return question

current_time = datetime.now()

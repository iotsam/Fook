from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DB_URL = "mysql+pymysql://root:root@localhost:3306/fook_db"


def get_db():
    try:
        session = engineconn().get_session()
        yield session

    finally:
        session.close()


class engineconn:
    def __init__(self):
        self.engine = create_engine(DB_URL, pool_recycle=500)

    def get_session(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    def get_connection(self):
        conn = self.engine.connect()

        return conn

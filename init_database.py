from models import *


class InitDatabase:

    def init_db():
        #ConnectDatabase.db.drop_tables([Board, Card], safe=True)
        ConnectDatabase.db.create_tables([Board, Card], safe=True)
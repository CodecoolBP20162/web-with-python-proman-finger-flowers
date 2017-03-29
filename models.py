from peewee import *
from connect_database import ConnectDatabase


class BaseModel(Model):

    class Meta:
        database = ConnectDatabase.db


class Board(BaseModel):
    title = CharField(null=True)


class Card(BaseModel):
    title = CharField(null=True)
    text = TextField(null=True)
    board = ForeignKeyField(Board)
    status = CharField(null=True)
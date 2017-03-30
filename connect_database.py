from peewee import *


class ConnectDatabase:

    def get_connect_string():
        try:
            with open('connect_str.txt', "r") as db_name:
                return db_name.readline()
        except:
            print("You need to create a database and store its name in a file named 'connect_str.txt'. \
                  For more info, head over to the README")

    db = PostgresqlDatabase('d4lpcgm00g22ht', user='ezckpelqnqmmda', password='20686cb1a7d6bae8460e3adf71eb817b6523f9ac0308bea4a6dda435c990e73b', host='ec2-54-247-92-185.eu-west-1.compute.amazonaws.com' )
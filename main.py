################################### BIG CHUNK OF NEW ADDING ###################################################################
from peewee import *


#YOU NEED TO CREATE A dbopen.txt, AND WRITE YOUR DATABASENAME AND USERNAME HERE LIKE:
#fingerflowers
#kyrka

# and don't forget to make a database in postgres elephant too with this parameters

#with open('dbopen.txt', 'r') as f:
db = PostgresqlDatabase('fingerflowers', user='kyrka') #(f.readline()[:-1], user=f.readline()[:-1])


class BaseModel(Model):
    class Meta:
        database = db


class Board(BaseModel):
    boardtitle = CharField()
    cardlist = CharField()  # it's a list


class Card(BaseModel):
    cardtitle = CharField()
    cardtext = CharField()


class Build:
    @classmethod
    def create_tables(cls):
        try:
            db.connect()
            db.create_tables([Board, Card])

        except:
            return "Some error. You've already created a database maybe?"

#Build.create_tables() - comment in this one if you want to create the databases




################################################# END OF BIG CHUNK OF ADDINGS ################################################################x

from flask import * #Flask, render_template, redirect, url_for, request
#kyrka touched the imports


app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/')
def listing():
    return render_template("index.html")

@app.route('/cards')
def cards():
    return render_template("cards.html")

@app.route('/funny_dog', methods=['GET'])
def show_detailed_board_page():
    return render_template("funny_dog.html")

@app.route('/add', methods=['POST'])
def add_new_board():
    return redirect(url_for("listing"))


###### THE NEW CARD SAVING METHOD ############################
@app.route("/save_card_to_database_from_js", methods=['POST'])
def save_card_to_database_from_js():
    getted_title = request.json['cardTitle'] # get the data from the xhr object
    getted_text = request.json['cardText']
    this_card = Card.create(cardtitle=getted_title, cardtext=getted_text) # instantiate card in database
    this_card.save() # save it, it's important X'D
    return jsonify(this_card.cardtitle, this_card.cardtext) # send the data to the xhr object
########## ENDS HERE #########################################




if __name__ == "__main__":
    app.run(debug=True)
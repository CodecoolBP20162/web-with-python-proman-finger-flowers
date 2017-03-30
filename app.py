from flask import Flask, render_template, redirect, url_for, request, json
from models import *
from init_database import InitDatabase
import os
import psycopg2
import urllib.parse

urllib.parse.uses_netloc.append("postgres")
url = urllib.parse.urlparse(os.environ["DATABASE_URL"])

conn = psycopg2.connect(
    database=url.path[1:],
    user=url.username,
    password=url.password,
    host=url.hostname,
    port=url.port
)

app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/', methods=['GET'])
def listing():
    boards = Board.select()
    return render_template("index.html", boards=boards)


@app.route('/<board_id>')
def cards(board_id):
    cards_new = Card.select().where(Card.board == board_id, Card.status == "new").order_by(Card.position)
    cards_in_progress = Card.select().where(Card.board == board_id, Card.status == "in_progress").order_by(Card.position)
    cards_review = Card.select().where(Card.board == board_id, Card.status == "review").order_by(Card.position)
    cards_done = Card.select().where(Card.board == board_id, Card.status == "done").order_by(Card.position)
    return render_template("cards.html", board_id=board_id, cards_new=cards_new, cards_in_progress=cards_in_progress,
    cards_review=cards_review, cards_done=cards_done)


@app.route('/<board_id>/counter', methods=['GET'])
def count_cards(board_id):
    counter = 0
    cards = Card.select().where(Card.board == board_id)
    for card in cards:
        counter += 1
    return json.dumps({'cards': counter})


@app.route('/funny_dog', methods=['GET'])
def show_detailed_board_page():
    return render_template("funny_dog.html")


@app.route('/new_board', methods=['POST'])
def create_new_board():
    Board.create(title=request.form["board_title"])
    return redirect(url_for("listing"))


@app.route('/<board_id>/<card_title>/<card_text>', methods=['GET'])
def create_new_card(board_id, card_title, card_text):
    Card.create(title=card_title, text=card_text, board=board_id, status='new', position=0)
    return json.dumps({'success': 'New card was created.'})


@app.route('/<board_id>/<card_title>/<card_text>/<status>/<position>', methods=['GET'])
def update_order(board_id, card_title, card_text, status, position):
    update = Card.update(status=status, position=position).where(Card.board == board_id, Card.title == card_title, Card.text == card_text)
    update.execute()
    return json.dumps({'success': 'Order updated'})


if __name__ == "__main__":
    InitDatabase.init_db()
    app.run(debug=True)
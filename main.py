from flask import Flask, render_template, redirect, url_for, request
from models import *
from init_database import InitDatabase


app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/', methods=['GET', 'POST'])
def listing():
    if request.method == 'POST':
        Board.create(title=request.form["testtitle"])
        print("this is post")
        return redirect(url_for('listing'))
    else:
        print("this is get")
        return render_template("index.html")

@app.route('/cards')
def cards():
    return render_template("cards.html")


@app.route('/funny_dog', methods=['GET'])
def show_detailed_board_page():
    return render_template("funny_dog.html")

@app.route('/add', methods=['GET', 'POST'])
def add_new_board():
    Board.create(title=request.form["testtitle"])
    return redirect(url_for("listing"))

@app.route('/test')
def test():
    Board.create(title="testBoard")
    print("test")
    return redirect(url_for("listing"))

if __name__ == "__main__":
    InitDatabase.init_db()
    app.run(debug=True)
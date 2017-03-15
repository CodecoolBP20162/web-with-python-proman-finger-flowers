from flask import Flask, render_template, redirect, url_for, request

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

if __name__ == "__main__":
    app.run(debug=True)
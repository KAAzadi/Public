from functools import wraps
import json
from os import environ as env
from werkzeug.exceptions import HTTPException

from dotenv import load_dotenv, find_dotenv
from flask import Flask, request, jsonify, redirect, render_template, session, url_for
from authlib.integrations.flask_client import OAuth
from six.moves.urllib.parse import urlencode

#This class uses a lot of code from Auth0 Documentation "Quick Start"
#This is my first venture into 0Auth, so this code represents my first round of comprehension.
class Login(object):
    app = Flask(__name__)

    oauth = OAuth(app)

    auth0 = oauth.register(
        name='google',
        client_id='YOUR_CLIENT_ID',
        client_secret='YOUR_CLIENT_SECRET',
        access_token_url='https://accounts.google.com/o/oauth2/token',
        access_token_params=None,
        authorize_url='https://accounts.google.com/o/oauth2/token',
        authorize_params=None,
        api_base_url="https://www.googleapis.com/oauth2/v1",
        client_kwargs={
            'scope': 'openid profile email',
        },
    )

    @app.route('/login')
    def Login(self):
        return self.auth0.authorize_redirect(redirect_uri='login.html')

    

    @app.route('/logout')
    def Logout(self):
        # Clear session stored data
        session.clear()
        # Redirect user to logout endpoint
        params = {'returnTo': url_for('home', _external=True), 'client_id': 'YOUR_CLIENT_ID'}
        return redirect(self.auth0.api_base_url + '/v2/logout?' + urlencode(params))

    @app.route('/callback')
    def CallbackHandling(self):
        # Handles response from token endpoint
        self.auth0.authorize_access_token()
        resp = self.auth0.get('userinfo')
        userinfo = resp.json()

        # Store the user information in flask session.
        session['jwt_payload'] = userinfo
        session['profile'] = {
            'user_id': userinfo['id'],
            'password':userinfo['password'],
            'name': userinfo['name'],
            'children': userinfo['children'],
            'phone number': userinfo['phone number']
        }
        return redirect('/dashboard')

    def RequiresAuth(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if 'profile' not in session:
                # Redirect to Login page here
                return redirect('/')

            return f(*args, **kwargs)

        return decorated

    @app.route('/dashboard')
    @RequiresAuth
    def Dashboard():
        return render_template('dashboard.html',
                               userinfo=session['profile'],
                               userinfo_pretty=json.dumps(session['jwt_payload'], indent=4))



class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code
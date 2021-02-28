import { StrategyOptionWithRequest } from "passport-facebook";
import { StrategyOptionsWithRequest } from "passport-google-oauth20";
import { IStrategyOption } from "passport-twitter";

import {
	_baseUrl,
	_facebookAppId,
	_facebookAppSecret,
	_googleClientId,
	_googleClientSecret,
	_twitterConsumerKey,
	_twitterConsumerSecret
} from "../../consts";

export const googleConfig: StrategyOptionsWithRequest = {
	clientID: _googleClientId,
	clientSecret: _googleClientSecret,
	callbackURL: `${_baseUrl}/auth/google/callback`,
	passReqToCallback: true
}

export const twitterConfig: IStrategyOption = {
	consumerKey: _twitterConsumerKey,
	consumerSecret: _twitterConsumerSecret,
	callbackURL: `${_baseUrl}/auth/twitter/callback`
}

export const facebookConfig: StrategyOptionWithRequest = {
	clientID: _facebookAppId,
	clientSecret: _facebookAppSecret,
	callbackURL: `${_baseUrl}/auth/facebook/callback`,
	passReqToCallback: true
}
import { Component } from "preact";
import firebase from "firebase/app";
import config from "./config.js";
import "firebase/database";
import "./style";

const firebaseConfig = {
	apiKey: config.apiKey,
	authDomain: config.authDomain,
	databaseURL: config.databaseURL,
	projectId: config.projectId
};

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
	state = {
		loading: true
	};

	updateStatus = () => {
		firebase
			.database()
			.ref("status")
			.set(!this.state.full);
	};

	componentDidMount() {
		firebase
			.database()
			.ref("status")
			.on("value", data => {
				this.setState({ full: data.val(), loading: false });
			});
	}

	render() {
		const { full, loading } = this.state;

		return (
			<div class="container">
				<div>Nitro Cold Brew Status</div>
				<div>
					{loading ? (
						"Getting Status"
					) : full ? (
						<img src="../assets/good.png" />
					) : (
						<img src="../assets/bad.png" />
					)}
				</div>
				<button onClick={this.updateStatus}>Update Status</button>
			</div>
		);
	}
}

import Navbar from '../components/Navbar'

export default function Register() {
	return (
		<>
			<Navbar />
			<div>Register</div>
			<div>
				<from>
					<input
						type="text"
						placeholder="Username"
						// value={username}
						// onChange={(ev) => setName(ev.target.value)}
					/>
					<input
						type="text"
						placeholder="Email"
						// value={email}
						// onChange={(ev) => setEmail(ev.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						// value={password}
						// onChange={(ev) => setPassword(ev.target.value)}
					/>
                    <input
						type="password"
						placeholder="Confirmed Password"
						// value={cfpassword}
						// onChange={(ev) => setCfpassword(ev.target.value)}
					/>
                    <button>Sign Up</button>
				</from>
			</div>
		</>
	)
}

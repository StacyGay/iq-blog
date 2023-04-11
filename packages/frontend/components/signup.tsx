import { ReactElement } from 'react';

export function Signup(): ReactElement {
    return (
        <div className="p-2">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Username</span>
                </label>
                <input
                    type="text"
                    placeholder="username"
                    className="input input-bordered"
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Retype Password</span>
                </label>
                <input
                    type="password"
                    placeholder="retype password"
                    className="input input-bordered"
                />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
            </div>
        </div>
    );
}

import {LoginStatus} from "../user/LoginStatus";
import {Link, Outlet} from "react-router-dom";
import {Protect} from "@clerk/clerk-react";

export const Layout = () => {
    return (
        <div>
            <header>
                <h1>Planero</h1>
                <div>
                    <LoginStatus/>
                </div>
            </header>
            <div>
                <main>
                    <Outlet/>
                </main>
                <nav>
                    <ul>
                        <Protect>
                            <li><Link to={"calendar"}>Calendar</Link></li>
                            <li><Link to={"setup/group"}>Family Setup</Link></li>
                        </Protect>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
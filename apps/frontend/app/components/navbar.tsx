export default function Navbar(){
    return (
        <section>
            <div className="container">
                <div className="grid grid-cols-3">
                    <div className="">
                            Xtrade
                    </div>
                    <div className='flex'>
                            <nav>
                                <a>home</a>
                                <a>docs</a>
                                <a>contact</a>
                            </nav>
                    </div>
                    <div>
                        <button>Login</button>
                        <button>Signup</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
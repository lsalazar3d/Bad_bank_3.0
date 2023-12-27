
function Spa() {
 // const { setStatus } = useContext(UserContext);

  return (
    <HashRouter>
      <div>
        <NavBar/>        
        <UserContext.Provider value={{users:[{name:'Luis',email:'salazarl@mit.edu',password:'secret',balance:100}]}}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(

  <Spa/>

);
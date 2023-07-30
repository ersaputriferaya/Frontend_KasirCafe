import React from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import axios from "axios";

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      // customer: [],
      meja: [],
      menu: [],
      role: "",
      token: "",
      action: "",
    };

    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "kasir"
      ) {
        this.state.token = localStorage.getItem("token");
        this.state.role = localStorage.getItem("role");
      } else {
        window.alert("You're not admin or kasir!");
        window.location = "/";
      }
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  getUser = () => {
    let url = "http://localhost:8000/user/getAll";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({
          user: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getKamar = () => {
    let url = "http://localhost:8000/meja/getAll";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          meja: response.data,
        });
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error)  ;
      });
  };

  getTipekamar = () => {
    let url = "http://localhost:8000/menu/getAll";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          menu: response.data,
        });
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  checkRole = () => {
    if (this.state.role !== "kasir" && this.state.role !== "admin") {
      localStorage.clear();
      window.alert("You're not admin or kasir!");
      window.location = "/";
    }
  };

  componentDidMount() {
    this.getUser();
    this.getKamar();
    this.getTipekamar();
    this.checkRole();
  }

  render() {
    return (
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <Sidebar />
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <Header />
          <section>
          <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
  <div class="grid gap-10 lg:grid-cols-2">
    <div class="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
      <div class="max-w-xl mb-6">
        <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl sm:leading-none">
          Selamat Datang di Wikusama Crepe Cake Cafe<br class="hidden md:block" />
        </h2>
        <p class="text-base text-gray-700 md:text-lg">
        Selamat Datang Di Wikusama crepe cake cafe
        </p>
      </div>
      <div>
      </div>
    </div>
    
    </div>
  </div>

</section>

          <footer className="footer px-4 py-2">
            <div className="footer-content">
              <p className="text-sm text-gray-600 text-center">
                © 2023. All rights reserved.
              </p>
            </div>
          </footer>
        </main>
      </div>
    );
  }
}
import "./App.css";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Column from "./components/Column/Column";
import Card from "./components/Card/Card";
import Calendar from "./components/Calendar/Calendar";
import PopBrowse from "./components/popups/PopBrowse/PopBrowse";
import PopNewCard from "./components/popups/PopNewCard/PopNewCard";
import PopUser from "./components/popups/PopUser/PopUser";

function App() {
  

  return (
    <>
      <div className="wrapper">
        {/* pop-up start */}
        <PopUser />
        <PopNewCard />
        <PopBrowse />
        {/* pop-up end */}
        <Header />
        <Main>
          <div className="main__content">
            <Column title="Без статуса">
              <Card
                themeClass="_orange"
                themeText="Web Design"
                title="Название задачи"
                date="30.10.23"
              />
              <Card
                themeClass="_green"
                themeText="Research"
                title="Название задачи"
                date="30.10.23"
              />
              <Card
                themeClass="_orange"
                themeText="Web Design"
                title="Название задачи"
                date="30.10.23"
              />
              <Card
                themeClass="_purple"
                themeText="Copywriting"
                title="Название задачи"
                date="30.10.23"
              />
              <Card
                themeClass="_orange"
                themeText="Web Design"
                title="Название задачи"
                date="30.10.23"
              />
            </Column>
            <Column title="Нужно сделать">
              <Card
                themeClass="_green"
                themeText="Research"
                title="Название задачи"
                date="30.10.23"
              />
            </Column>
            <Column title="В работе">
              <Card
                themeClass="_green"
                themeText="Research"
                title="Название задачи"
                date="30.10.23"
              />
              <Card
                themeClass="_purple"
                themeText="Copywriting"
                title="Название задачи"
                date="30.10.23"
              />
              <Card
                themeClass="_orange"
                themeText="Web Design"
                title="Название задачи"
                date="30.10.23"
              />
            </Column>
            <Column title="Тестирование">
              <Card
                themeClass="_green"
                themeText="Research"
                title="Название задачи"
                date="30.10.23"
              />
            </Column>
            <Column title="Готово">
              <Card
                themeClass="_green"
                themeText="Research"
                title="Название задачи"
                date="30.10.23"
              />
            </Column>
          </div>
        </Main>
      </div>
      <script src="js/script.js"></script>
    </>
  );
}

export default App;

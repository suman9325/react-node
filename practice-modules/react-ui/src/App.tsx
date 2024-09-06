import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ListView from './pages/Dashboard/Users/ListView';
import Test from './pages/Test/Test';
import DependDropDown from './pages/Dashboard/DropDown/DependDropDown';
import SingleFileUpload from './pages/Dashboard/FileUpload/SingleFileUpload';
import MultipleFileUpload from './pages/Dashboard/FileUpload/MultipleFileUpload';
import SingleFileProgress from './pages/Dashboard/FileUpload/SingleFileProgress';
import SearchableDropDown from './pages/Dashboard/DropDown/SearchableDropDown';
import DependDropDownBS from './pages/Dashboard/DropDown/DependDropDownBS';
import MultipleFileUploadShow from './pages/Dashboard/FileUpload/MultipleFileUploadShow';
import DependDropDownAPI from './pages/Dashboard/DropDown/DependDropDownAPI';
import MultiselectDropdown from './pages/Dashboard/DropDown/MultiselectDropdown';
import GridWithCheckbox from './pages/Dashboard/TableGridView/GridWithCheckbox';
import GridWithToggleButton from './pages/Dashboard/TableGridView/GridWithToggleButton';
import GridWithCellColor from './pages/Dashboard/TableGridView/GridWithCellColor';
import ActiveInactiveGridWithToggleButton from './pages/Dashboard/TableGridView/ActiveInactiveGridWithToggleButton';
import GridWithFileDownload from './pages/Dashboard/TableGridView/GridWithFileDownload';

function App() {
  return (
    <Fragment>
      {/* <Login/>
        <Signup /> */}
      {/* <Test/> */}
      {/* <ListView/> */}
      {/* <DependDropDown /> */}
      {/* <SingleFileUpload /> */}
      {/* <MultipleFileUpload/> */}
      {/* <SingleFileProgress/> */}
      {/* <SearchableDropDown /> */}
      {/* <DependDropDownBS/> */}
      {/* <MultipleFileUploadShow/> */}
      {/* <DependDropDownAPI /> */}
      {/* <MultiselectDropdown /> */}
      {/* <GridWithCheckbox /> */}
      {/* <GridWithToggleButton /> */}
      {/* <GridWithCellColor /> */}
      {/* <ActiveInactiveGridWithToggleButton /> */}
      <GridWithFileDownload />
    </Fragment>
  );
}

export default App;

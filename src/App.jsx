import React from 'react'
import { BrowserRouter, Route, Router, Routes, useLocation } from 'react-router-dom'
// import Navbar from './Components/home/Navbar'
import Footer from './Components/home/Footer'
import SignupPage from './Components/User/Signup'
import LoginPage from './Components/User/Login'
import OTPPage from './Components/User/Otp'

import UserScientistForm from './Components/UserScientist/UserScientistForm'
import UserScientistPage from './Components/UserScientist/UserScientistPage'

import IntrumentPage from './Components/instrument/IntrumentPage'
import InstrumentForm from './Components/instrument/InstrumentForm'

import RawMaterialPage from './Components/Rowmatairiel/RowMetairialPage'
import RowMetairialForm from './Components/Rowmatairiel/RowMetairialForm'

import ProjectForm from './Components/Project Master/ProjectForm'
import ProjecPage from './Components/Project Master/ProjecPage'

import TestPage from './Components/Test/TestPage'
import TestForm from './Components/Test/TestForm'

import CentrallabPage from './Components/CentralLab/CentralLabPage'
import CentralLabForm from './Components/CentralLab/CentralLabForm'

import Dashboard from './Components/home/Dashboard'

import SamplePage from './Components/Data transaction/sample/samplePage'
import SampleForm from './Components/Data transaction/sample/SampleForm'

import ExperimentPage from './Components/Data transaction/Experiment/ExperimentPage'
import ExperimentForm from './Components/Data transaction/Experiment/ExperimentForm'

import AnalyticalTestPage from './Components/Data transaction/AnalyticalTest/AnalyticalTestPage'
import AnalyticalTestForm from './Components/Data transaction/AnalyticalTest/AnalyticalTestForm'

import StudyPage from './Components/Data transaction/studiesRecords/Studypage'
import StudyForm from './Components/Data transaction/studiesRecords/StudyForm'

import Projectlist from './Components/userList/Projectlist'
import LabList from './Components/userList/LabList'
import DownloadResults from './Components/DownloadResults'


export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
 function Layout() {
  const location = useLocation();

  // 👉 jin routes pe dashboard nahi chahiye
  const hideRoutes = ["/", "/signup", "/otp"];

  const hideDashboard = hideRoutes.includes(location.pathname);


  return (
    <>
            {/*  Dashboard sirf tab dikhe jab allowed ho */}
      {!hideDashboard && <Dashboard />}
      <Routes>
        
        {/* <Route path='/forms' element={<Navbar />} /> */}
        <Route path='/centrallab' element={<CentrallabPage />} />
        <Route path='/centrallab/create' element={<CentralLabForm />} />
        <Route path='/centrallab/create/:id' element={<CentralLabForm />} />

        <Route path='/user' element={<UserScientistPage />} />
        <Route path='/user/create/:id' element={<UserScientistForm />} />
        <Route path='/user/create' element={<UserScientistForm />} />

        <Route path='/project' element={<ProjecPage/>} />
        <Route path='/project/create/:id' element={<ProjectForm />} />
        <Route path='/project/create' element={<ProjectForm />} />

        <Route path='/metairial' element={<RawMaterialPage />} />
        <Route path='/metairial/create/:id' element={<RowMetairialForm />} />
        <Route path='/metairial/create' element={<RowMetairialForm />} />

        <Route path='/instrument' element={<IntrumentPage />} />
        <Route path='/instrument/create/:id' element={<InstrumentForm />} />
        <Route path='/instrument/create' element={<InstrumentForm />} />

        <Route path='/test' element={<TestPage />} />
        <Route path='/test/create/:id' element={<TestForm />} />
        <Route path='/test/create' element={<TestForm/>} />

        <Route path='/sample' element={<SamplePage/>}/>
        <Route path='/sample/create/:id' element={<SampleForm/>}/>
        <Route path='/sample/create' element={<SampleForm/>}/>

        <Route path='/experiment' element={<ExperimentPage/>}/>
        <Route path='/experiment/create/:id' element={<ExperimentForm/>}/>
        <Route path='/experiment/create' element={<ExperimentForm/>}/>

        <Route path='/analytical' element={<AnalyticalTestPage/>}/>
        <Route path='/analytical/create/:id' element={<AnalyticalTestForm/>}/>
        <Route path='/analytical/create' element={<AnalyticalTestForm/>}/>

         <Route path='/study' element={<StudyPage/>}/>
        <Route path='/study/create/:id' element={<StudyForm/>}/>
        <Route path='/study/create' element={<StudyForm/>}/>

        <Route path='/result' element={<DownloadResults/>}/>

        <Route  path='/signup' element={<SignupPage />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/otp' element={<OTPPage />} />
        <Route path='/project/projectlist' element={<Projectlist />} />
        <Route path='/centrallab/lablist' element={<LabList />} />
      </Routes>
      <Footer />
    </>
  );
}


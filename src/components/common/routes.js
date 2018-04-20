/**
 * Created by lixin on 2018/4/9.
 */


import React from 'react'
import {
    Route,
    Switch,
} from 'react-router-dom'
import HomeIndex from '../home/homeIndex'
import AuditPage from '../audits/audits'
import StartAuditPage from '../audits/startAuditPage'
import LawList from '../law/lawListPage'
import PlanPage from '../audits/plans'
import StaticPage from '../audits/statics'
import StaticsRadar from '../audits/staticsRadar'
import AuditQuestions from '../audits/auditQuestions'
import QuestionDetail from '../audits/questionDetail'
import TrainIndex from '../train/tarinIndex'
import Message from '../user/message'
import CheckIndex from '../check/checkIndex'
import FuncPage from '../audits/funcPage'
import Signature from '../audits/signature'
import LawDetail from '../law/lawDetail'
import Remarks from '../audits/remarks'
import CheckQuestion from '../check/checkQuestion'
import Report from '../audits/report'
import ReportDetail from '../audits/reportDetail'
const Routes = () => (

            <Switch>
                <Route exact path="/" component={HomeIndex}/>

                <Route  path="/audits" component={AuditPage}/>

                <Route  path="/startAudit" component={StartAuditPage}/>
                <Route  path="/auditQuestions" component={AuditQuestions}/>

                <Route path="/law" component={LawList}/>
                <Route path="/auditsPlan" component={PlanPage}/>
                <Route path="/auditsStatics" component={StaticPage}/>
                <Route path="/radar" component={StaticsRadar}/>
                <Route path="/questionDetail" component={QuestionDetail}/>
                <Route path="/train" component={TrainIndex}/>
                <Route path="/message" component={Message}/>
                <Route path="/check" component={CheckIndex}/>
                <Route path="/func" component={FuncPage}/>
                <Route path="/signature" component={Signature}/>
                <Route path="/lawDetail" component={LawDetail}/>
                <Route path="/remarks" component={Remarks}/>
                <Route path="/checkQuestion" component={CheckQuestion}/>
                <Route path="/report" component={Report}/>
                <Route path="/reportDetail" component={ReportDetail}/>
            </Switch>
)

export default Routes

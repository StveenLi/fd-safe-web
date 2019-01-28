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
import AuditQuestionsByList from '../audits/auditQuestionsByList'
import AuditQuestionsResult from '../audits/auditQuestions_result'
import QuestionDetail from '../audits/questionDetail_N'
//import QuestionDetail from '../audits/questionDetail'
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
import ReportList from '../audits/reportList'
import AuditComplete from '../audits/auditComplete'
import Sign from '../audits/sign'
import Login from '../user/login'
import PrivateRoute from './PrivateRoute'
import VideoTrain from '../audits/videoTrain'
import ImgDetailTrain from '../audits/imgTrain'
import TrainList from '../train/tarinList'
import TrainDetail from '../train/tarinDetail'
import PersonalBasicResult from '../check/personalBasicResult'
import BasicResultDetail from '../check/basicResultDetail'
import HistoryQuestionAll from '../check/historyQuestionAll'
import CheckQuestionUpGrade from '../check/checkQuestionUpGrade'
import Qualifications from '../home/qualifications'
const Routes = () => (
            <Switch>

                <Route exact path="/" component={Login}/>
                <PrivateRoute path="/home" component={HomeIndex}/>
                <PrivateRoute path="/audits" component={AuditPage}/>
                <PrivateRoute path="/startAudit" component={StartAuditPage}/>
                <PrivateRoute path="/auditQuestions" component={AuditQuestions}/>
                <PrivateRoute path="/auditQuestionsByList" component={AuditQuestionsByList}/>
                <PrivateRoute path="/auditQuestionsResult" component={AuditQuestionsResult}/>
                <PrivateRoute path="/questionDetail/:qid" component={QuestionDetail}/>
                <PrivateRoute path="/law" component={LawList}/>
                <PrivateRoute path="/auditsPlan" component={PlanPage}/>
                <PrivateRoute path="/auditsStatics" component={StaticPage}/>
                <PrivateRoute path="/radar" component={StaticsRadar}/>
                <PrivateRoute path="/questionDetail" component={QuestionDetail}/>
                <PrivateRoute path="/train" component={TrainIndex}/>
                <PrivateRoute path="/message" component={Message}/>
                <PrivateRoute path="/check" component={CheckIndex}/>
                <PrivateRoute path="/func" component={FuncPage}/>
                <PrivateRoute path="/signature" component={Signature}/>
                <PrivateRoute path="/lawDetail" component={LawDetail}/>
                <PrivateRoute path="/remarks" component={Remarks}/>
                <PrivateRoute path="/checkQuestion" component={CheckQuestion}/>
                <PrivateRoute path="/report" component={Report}/>
                <PrivateRoute path="/reportDetail/:assessId" component={ReportDetail}/>
                <PrivateRoute path="/reportList" component={ReportList}/>
                <PrivateRoute path="/auditComplete" component={AuditComplete}/>
                <PrivateRoute path="/trainVideoPage" component={VideoTrain}/>
                <PrivateRoute path="/trainImgDetailPage" component={ImgDetailTrain}/>
                <PrivateRoute path="/sign" component={Sign}/>
                <PrivateRoute path="/trainList" component={TrainList}/>
                <PrivateRoute path="/trainDetail/:qid" component={TrainDetail}/>
                <PrivateRoute path="/personalBasicResult" component={PersonalBasicResult}/>
                <PrivateRoute path="/basicResultDetail" component={BasicResultDetail} />
                <PrivateRoute path="/historyQuestionAll" component={HistoryQuestionAll} />
                <PrivateRoute path="/checkQuestionUpGrade" component={CheckQuestionUpGrade} />
                <Route path="/qualifications" component={Qualifications}/>
            </Switch>
)

export default Routes

import React,{Component} from 'react';

import AwsS3 from "./config";
import { tsConstructorType } from '@babel/types';

const AWS = require("aws-sdk/global");
const S3 = require("aws-sdk/clients/s3");

AWS.config.update(
  {
    accessKeyId : AwsS3.accessKeyId,
    secretAccessKey : AwsS3.secretAccessKey,
    region: AwsS3.region
  }
);

const s3 =new AWS.S3();

var fileObj;

class ObjList extends Component{

    constructor(props)
        {
            super(props);
            this.state = {
                            files:{},
                            fileList:[]
                        }
            this.theFiles = this.theFiles.bind(this);
        }

    componentDidMount()
    {
        const params = {
        Bucket: 'wibemic',
        Delimiter: '',
        Prefix: ''
        }

        s3.listObjectsV2(params,(err,data)=>{
        if(err) throw err;
        fileObj = data.Contents;
        //fileObj= JSON.stringify(fileObj);
        console.log(fileObj);
        this.setState({files:fileObj});
        
        });
    }

    componentDidUpdate(prevProps,prevState)
    {
        if(prevState.files!==this.state.files)
        {
            //console.log("obj "+ JSON.stringify(this.state.files));
            let fileList = "";
            let files = this.state.files;
            let fileNames = files.map(x=>{
               return x.Key 
               
            });
            this.setState({fileList: fileNames})
            console.log(fileNames);
            this.theFiles();
        }
    }


    theFiles()
    {
        
        //return <audio controls="controls" src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
        return <h1>sry error</h1>
    }


    render()
    {
           
        const dataentry = (props)=>
        {
            let fileList = props.fileList;
            let ListedFiles = fileList.map(y=>
                {
                    return <div><h5>{y}</h5><audio controls="controls" src={"https://wibemic.s3.ap-south-1.amazonaws.com/"+y} /></div>
                })

            return (
            <div>
                {ListedFiles}
            </div>
            );
        }

        return(
            <h2>
                <h1>Record Files</h1>
                <dataentry fileList={this.state.fileList}/>
            </h2>
        );
}
}

export default ObjList;
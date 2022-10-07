song1="";
song2="";

song1_status="";
song2_status="";
scoreRightwrist=0;
scoreLeftwrist=0;

RightwristX=0;
LeftwristX=0;
RightwristY=0;
LeftwristY=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.position(450,250);

    video=createCapture(VIDEO);
    video.hide();
    
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function gotPoses(results){
if(results.length>0){
    scoreLeftwrist=results[0].pose.keypoints[10].score;
    scoreRightwrist=results[0].pose.keypoints[9].score;
    console.log("scoreRightwrist="+ scoreRightwrist+ " scoreLeftwrist="+ scoreLeftwrist);
    LeftwristX=results[0].pose.leftWrist.x;
    RightwristY=results[0].pose.rightWrist.y;
    LeftwristX=results[0].pose.leftWrist.x;
    RightwristY=results[0].pose.rightWrist.y;
    console.log("LeftwristX="+LeftwristX+ " RightwristX="+RightwristX);
    console.log("LeftwristY="+LeftwristY+ " RightwristY="+RightwristY);
}
}

function modelLoaded(){
    console.log('posenet in initialized')
}

function draw(){
    image(video,0,0,600,500);

    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    fill("blue");
    stroke("red");
    if(scoreRightwrist>0.2){
        circle(RightwristX,RightwristY,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML="playing-harry potter theme song"
        }
    }
    if(scoreLeftwrist>0.2){
        circle(LeftwristX,LeftwristY,20);
        song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML="playing-peterpan song";
        }
    }
}
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}









































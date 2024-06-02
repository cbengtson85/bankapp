import React from 'react';

const slideShowSeconds = 30;
const slideShowTimeout = slideShowSeconds * 1000;

const imgStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    bottom: 0,
    left: 0,
    margin: 'auto',
    overflow: 'auto',
    position: 'fixed',
    right: 0,
    top: 0,
    objectFit: 'contain'
}

const fadeOut = {
    opacity: 0.04,
    transition: 'visibility 0s 0.35s, opacity 0.35s linear'
}

const fadeIn = {
    visibility: 'visible',
    opacity: 1,
    transition: 'opacity 0.7s linear'
}



const hide = {
    visibility: 'hidden'
}


class Home extends React.Component {

    interval = null;

    timeout = null;

    videoInterval = null;

    picInterval = null;

    constructor(props) {
        super(props);
        this.state = {
            picList: [],
            picIndex: 0,
            addFade: false,
            picIntervalMs: 0
        }
    }

    handleAdvance = (shouldNotSetUp) => {
        clearTimeout(this.timeout);
        clearInterval(this.picInterval)
 
        this.timeout = setTimeout(() => {
            this.setState((prevState) => ({ 
                picIndex: prevState.picIndex + 1 ,
                addFade: false
            }))
            if(!shouldNotSetUp) {
                this.setUpInterval();
            }
        }, 380);

        this.setState({addFade: true, picIntervalMs: 0});
        this.setUpPicInterval();
    }

    handleVideoEnd = () => {
        setTimeout(() => {
            if(this.state.picIndex < this.state.picList.length) {
                this.handleAdvance()
            }
        }, 3000);
        clearInterval(this.videoInterval)
    }

    handleVideoStart = () => {
        clearInterval(this.interval);
        clearInterval(this.videoInterval)

        const progress = document.getElementById('progress');
        const video = document.getElementById('vid');
    
        this.videoInterval = setInterval(function () {
            progress.value = (video.currentTime / video.duration) * 100 + 4
        }, 200);
    }

    handleKeyUp = (e) => {
        if(e.which == 39) {
            if(this.state.picIndex < this.state.picList.length) {
                this.handleAdvance()
            }
        }
        if(e.which == 37) {
            if(this.state.picIndex > 0) {
                this.setState((prevState) => ({ 
                    picIndex: prevState.picIndex - 1 
                }))
                this.setUpInterval();
            }
        }
        
    }

    setUpPicInterval = () => {
        clearInterval(this.picInterval);
        this.picInterval = setInterval(() => {
            const fileObj = this.state.picList[this.state.picIndex];

            if(fileObj && fileObj.src) {
                const fileName = fileObj.src;
                if(this.isImage(fileName)) {
                    this.setState((prevState) => ({ 
                        picIntervalMs: prevState.picIntervalMs + 300 
                    }))
                }
            }
        }, 300);
    }

    setUpInterval = () => {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            if(this.state.picIndex < this.state.picList.length) {
                this.handleAdvance(true)
            }
        }, slideShowTimeout);
    }
    componentDidMount() {
        const fetchPromise = fetch('/pics?test=' + Math.random());
        fetchPromise.then(response => {
            const res = response.json();
            res.then(picResponse => {
                this.setState({
                    picList: picResponse.files
                })
                this.setUpInterval()
            })
        });

        addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextState.picIndex + 1 >= nextState.picList.length) {
            location.reload();
        }
    }

    isImage = (fileName) => {
        if(!fileName) {
            return true
        }
        return (fileName.indexOf('.JPG') > -1 || fileName.indexOf('.jpg') > -1 || fileName.indexOf('.jpeg') > -1 || fileName.indexOf('.webp') > -1 || fileName.indexOf('.png') > -1 || fileName.indexOf('.PNG') > -1);
    }

    showNextImage = () => {
        if(this.state.picIndex + 1 <= this.state.picList.length && this.state.picList[this.state.picIndex + 1]) {
            const filename = this.state.picList[this.state.picIndex + 1].src;
            if(this.isImage(filename)) {
                return (
                    <img style={{...imgStyle, ...hide}} src={filename}/>
                )
            }
        }
    }

    render() {
        const { picList, picIndex} = this.state;
        if(!picList.length) {
            return null;
        }

        const fileObj = picList[picIndex];

        if(!fileObj || !fileObj.src) {
            console.log(1111, picIndex, picList)
            location.reload();
        }

        const fileName = fileObj.src;
        const date = fileObj.date;
        const location1 = fileObj.location1;
        const location2 = fileObj.location2;
        
        const isImage = this.isImage(fileName)
        

        let styling = imgStyle;
        if(this.state.addFade) {
            styling = {
                ...imgStyle,
                ...fadeOut
            }
        } else {
            styling = {
                ...imgStyle,
                ...fadeIn
            }
        }
        
        let imagePercent = Math.round(this.state.picIntervalMs / (slideShowSeconds * 1000) * 100);
        if(imagePercent > 99) {
            imagePercent = 100;
        }
        
        return (
            <div>
                <div id='index'>
                    {`${picIndex + 1}`}
                </div>
                {isImage ?
                (
                    <span>
                        <img style={styling} src={fileName} />
                        {this.showNextImage()}
                    </span>
                   
                )
                    : 
                    (
                        <span>
                        <video id="vid" onPlay={this.handleVideoStart} onEnded={this.handleVideoEnd} style={styling} key={fileName} playsInline autoPlay muted>
                            <source src={fileName} type="video/mp4" />
                        </video>
                        <span id="cont">
                        <figcaption>
                        <progress key={fileName + '1'} id="progress" max="100" value="0">Progress</progress>
                        </figcaption>
                            
                            </span>
                        {this.showNextImage()}
                        </span>
                    )
                }   
                {!!date && (
                    <div id='date'>
                        {!!location2 &&
                        (
                            <span id="location2">
                                {location2}
                            </span>
                        )
                        }
                        {!!location1 &&
                            (
                                <span id="location1">
                                    {location1}
                                </span>
                            )
                        }
                         <span id="date1">
                            {date}
                         </span>
                         {!!isImage &&
                         <div key={picIndex} id="isimage">
                            <div key={picIndex} id="insideimage" style={{width: `${imagePercent}%`}}></div>
                         </div>
                         }
                    </div>
                )}
            </div>
        )
    }
}

export default Home;

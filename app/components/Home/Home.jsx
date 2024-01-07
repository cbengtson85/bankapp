import React from 'react';

const slideShowTimeout = 5 * 1000;

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
    opacity: 0.1,
    transition: 'visibility 0s 0.4s, opacity 0.4s linear'
}

const fadeIn = {
    visibility: 'visible',
    opacity: 1,
    transition: 'opacity 0.5s linear'
}



const hide = {
    visibility: 'hidden'
}


class Home extends React.Component {

    interval = null;

    timeout = null;

    videoInterval = null;

    constructor(props) {
        super(props);
        this.state = {
            picList: [],
            picIndex: 0,
            addFade: false
        }
    }

    handleAdvance = (shouldNotSetUp) => {
        clearTimeout(this.timeout);
 
        this.timeout = setTimeout(() => {
            this.setState((prevState) => ({ 
                picIndex: prevState.picIndex + 1 ,
                addFade: false
            }))
            if(!shouldNotSetUp) {
                this.setUpInterval();
            }
        }, 500);

        this.setState({addFade: true})
        
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
            progress.value = Math.round(
            (video.currentTime / video.duration) * 100 + 4
        );
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
        if(nextState.picIndex >= nextState.picList.length) {
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

        return (
            <div>
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
                    </div>
                )}
            </div>
        )
    }
}

export default Home;

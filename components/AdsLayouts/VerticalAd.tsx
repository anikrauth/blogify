export default function VerticalAd(props: any){
    const {classNames} = props;
    return(
        <div className={`horizontalAd_wraper ${classNames} m-auto flex justify-center  items-center  dark:bg-dark_header_color bg-white_color`}>
            <p>Advertisement(320x250)</p>
        </div>
    )
}
import flexible from '../assets/img/flexible.jpg'
import midE from '../assets/img/m-e.jpg'
import itali from '../assets/img/italy.jpg'
import southA from '../assets/img/s-a.jpg'
import france from '../assets/img/france.jpg'
import uS from '../assets/img/u-s.jpg'

export function RegionSearch({ onRegionClick }) {

    return (
        <div className="region-select-container">
            <h4>Search by region</h4>

            <div className="region-grid">
                <div>
                    <img onClick={() => { onRegionClick('flexible') }} src={flexible} alt="I'm flexible" />
                    <p className="region-name">I'm flexible</p>
                </div>
                <div>
                    <img onClick={() => { onRegionClick('flexible') }} src={midE} alt="Middle East" />
                    <p className="region-name">Middle East</p>
                </div>
                <div>
                    <img onClick={() => { onRegionClick('flexible') }} src={itali} alt="Italy" />
                    <p className="region-name">Italy</p>
                </div>
                <div>
                    <img onClick={() => { onRegionClick('flexible') }} src={southA} alt="South America" />
                    <p className="region-name">South America</p>
                </div>
                <div>
                    <img onClick={() => { onRegionClick('flexible') }} src={france} alt="France" />
                    <p className="region-name">France</p>
                </div>
                <div>
                    <img onClick={() => { onRegionClick('United States') }} src={uS} alt="United States" />
                    <p className="region-name">United States</p>
                </div>
            </div>

        </div>
    )
}
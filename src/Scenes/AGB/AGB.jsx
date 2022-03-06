import React, { useEffect, useState } from "react"
import styles from "./AGB.module.css"

export default function AGB() {
    return (
        <div className="defaultPageContainer">
            <div>
                <div align="center">
                    <b>Nutzungsbedingungen DHBW-Forum</b>
                </div>
                <p>
                    <b>
                        § 1<br /> Geltungsbereich
                    </b>
                </p>
                <div align="justify">
                    Für die Nutzung dieser Website gelten im Verhältnis zwischen dem Nutzer und dem Betreiber der Seite (im Folgenden: Anbieter) die
                    folgenden Nutzungsbedingungen. Die Nutzung des Forums und der Communityfunktionen ist nur zulässig, wenn der Nutzer diese
                    Nutzungsbedingungen akzeptiert.
                </div>
                <p>
                    <b>
                        § 2<br /> Registrierung, Teilnahme, Mitgliedschaft in der Community
                    </b>
                </p>
                <div align="justify">
                    <p>
                        (1) Voraussetzung für die Nutzung des Forums und der Community ist eine vorherige Registrierung. Mit der erfolgreichen
                        Registrierung wird der Nutzer Mitglied der Community.
                    </p>
                    <p>(2) Es besteht kein Anspruch auf eine Mitgliedschaft.</p>
                    <p>
                        (3) Der Nutzer darf seinen Zugang nicht Dritten zur Nutzung überlassen. Der Nutzer ist verpflichtet, seine Zugangsdaten geheim
                        zu halten und vor dem Zugriff Dritter zu schützen.
                    </p>
                </div>
                <p>
                    <b>
                        § 3<br /> Leistungen des Anbieters
                    </b>
                </p>
                <div align="justify">
                    <p>
                        (1) Der Anbieter gestattet dem Nutzer, im Rahmen dieser Nutzungsbedingungen Beiträge auf seiner Webseite zu veröffentlichen.
                        Der Anbieter stellt den Nutzern dazu im Rahmen seiner technischen und wirtschaftlichen Möglichkeiten unentgeltlich ein
                        Diskussionsforum mit Communityfunktionen zur Verfügung. Der Anbieter ist bemüht, seinen Dienst verfügbar zu halten. Der
                        Anbieter übernimmt keine darüber hinausgehenden Leistungspflichten. Insbesondere besteht kein Anspruch des Nutzers auf eine
                        ständige Verfügbarkeit des Dienstes.(2) Der Anbieter übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit,
                        Verlässlichkeit, Aktualität und Brauchbarkeit der bereit gestellten Inhalte.
                    </p>
                </div>
                <p>
                    <b>
                        § 4<br /> Haftungsausschluss
                    </b>
                </p>
                <div align="justify">
                    <p>
                        (1) Schadensersatzansprüche des Nutzers sind ausgeschlossen, soweit nachfolgend nichts anderes bestimmt ist. Der vorstehende
                        Haftungsausschluss gilt auch zugunsten der gesetzlichen Vertreter und Erfüllungsgehilfen des Anbieters, sofern der Nutzer
                        Ansprüche gegen diese geltend macht.(2) Von dem in Absatz 1 bestimmten Haftungsausschluss ausgenommen sind
                        Schadensersatzansprüche aufgrund einer Verletzung des Lebens, des Körpers, der Gesundheit und Schadensersatzansprüche aus der
                        Verletzung wesentlicher Vertragspflichten. Wesentliche Vertragspflichten sind solche, deren Erfüllung zur Erreichung des Ziels
                        des Vertrags notwendig ist. Von dem Haftungsausschluss ebenfalls ausgenommen ist die Haftung für Schäden, die auf einer
                        vorsätzlichen oder grob fahrlässigen Pflichtverletzung des Anbieters, seiner gesetzlichen Vertreter oder Erfüllungsgehilfen
                        beruhen.
                    </p>
                </div>
                <p>
                    <b>
                        § 5<br /> Pflichten des Nutzers
                    </b>
                </p>
                <div align="justify">
                    <p>
                        (1) Der Nutzer verpflichtet sich gegenüber dem Anbieter, keine Beiträge zu veröffentlichen, die gegen die guten Sitten oder
                        geltendes Recht verstoßen. Der Nutzer verpflichtet sich insbesondere dazu, keine Beiträge zu veröffentlichen,
                    </p>
                    <ul>
                        <li>deren Veröffentlichung einen Straftatbestand erfüllt oder eine Ordnungswidrigkeit darstellt,</li>
                        <li>die gegen das Urheberrecht, Markenrecht oder Wettbewerbsrecht verstoßen,</li>
                        <li>die gegen das Rechtsdienstleistungsgesetz verstoßen,</li>
                        <li>die beleidigenden, rassistischen, diskriminierenden oder pornographischen Inhalt haben,</li>
                        <li>die Werbung enthalten.</li>
                    </ul>
                    <p>
                        (2) Bei einem Verstoß gegen die Verpflichtung aus Absatz 1 ist der Anbieter berechtigt, die entsprechenden Beiträge abzuändern
                        oder zu löschen und den Zugang des Nutzers zu sperren. Der Nutzer ist verpflichtet, dem Anbieter den durch die
                        Pflichtverletzung entstandenen Schaden zu ersetzen.
                    </p>
                    <p>(3) Der Anbieter hat das Recht, Beiträge und Inhalte zu löschen, wenn diese einen Rechtsverstoß enthalten könnten.</p>
                    <p>
                        (4) Der Anbieter hat gegen den Nutzer einen Anspruch auf Freistellung von Ansprüchen Dritter, die diese wegen der Verletzung
                        eines Rechts durch den Nutzer geltend machen. Der Nutzer verpflichtet sich, den Anbieter bei der Abwehr derartiger Ansprüche
                        zu unterstützen. Der Nutzer ist außerdem verpflichtet, die Kosten einer angemessenen Rechtsverteidigung des Anbieters zu
                        tragen.
                    </p>
                </div>
                <p>
                    <b>
                        § 6<br /> Übertragung von Nutzungsrechten
                    </b>
                </p>
                <div align="justify">
                    <p>
                        (1) Das Urheberrecht für die eingestellten Beiträge verbleibt beim jeweiligen Nutzer. Der Nutzer räumt dem Anbieter mit dem
                        Einstellen seines Beitrags in das Forum jedoch das Recht ein, den Beitrag dauerhaft auf seiner Webseite zum Abruf
                        bereitzuhalten und öffentlich zugänglich zu machen. Der Anbieter hat das Recht, Beiträge innerhalb seiner Webseite zu
                        verschieben und mit anderen Inhalten zu verbinden.(2) Der Nutzer hat gegen den Anbieter keinen Anspruch auf Löschung oder
                        Berichtigung von ihm erstellter Beiträge.
                    </p>
                </div>
                <p>
                    <b>
                        § 7<br /> Beendigung der Mitgliedschaft
                    </b>
                </p>
                <div align="justify">
                    <p>
                        (1) Der Nutzer kann seine Mitgliedschaft durch eine entsprechende Erklärung gegenüber dem Anbieter ohne Einhaltung einer Frist
                        beenden. Auf Verlangen wird der Anbieter daraufhin den Zugang des Nutzers sperren.(2) Der Anbieter ist berechtigt, die
                        Mitgliedschaft eines Nutzers unter Einhaltung einer Frist von 2 Wochen zum Monatsende zu kündigen.
                    </p>
                    <p>
                        (3) Bei Vorliegen eines wichtigen Grundes ist der Anbieter berechtigt, den Zugang des Nutzers sofort zu sperren und die
                        Mitgliedschaft ohne Einhaltung einer Frist zu kündigen.
                    </p>
                    <p>
                        (4) Der Anbieter ist nach Beendigung der Mitglieschaft berechtigt, den Zugang des Nutzers zu sperren. Der Anbieter ist
                        berechtigt aber nicht verpflichtet, im Falle der Beendigung der Mitgliedschaft die vom Nutzer erstellten Inhalte zu löschen.
                        Ein Anspruch des Nutzers auf Überlassung der erstellten Inhalte wird ausgeschlossen.
                    </p>
                </div>
                <p>
                    <b>
                        § 8<br /> Änderung oder Einstellung des Angebots
                    </b>
                </p>
                <div align="justify">
                    <p>
                        (1) Der Anbieter ist berechtigt, Änderungen an seinem Dienst vorzunehmen.(2) Der Anbieter ist berechtigt, seinen Dienst unter
                        Einhaltung einer Ankündigungsfrist von 2 Wochen zu beenden. Im Falle der Beendigung seines Dienstes ist der Anbieter
                        berechtigt aber nicht verpflichtet, die von den Nutzern erstellten Inhalte zu löschen.
                    </p>
                </div>
                <p>
                    <b>
                        § 9<br /> Rechtswahl
                    </b>
                </p>
                <div align="justify">
                    Auf die vertraglichen Beziehungen zwischen dem Anbieter und dem Nutzer findet das Recht der Bundesrepublik Deutschland Anwendung.
                    Von dieser Rechtswahl ausgenommen sind die zwingenden Verbraucherschutzvorschriften des Landes, in dem der Nutzer seinen
                    gewöhnlichen Aufenthalt hat.
                </div>
            </div>
        </div>
    )
}

package Models

import Models.ANP.ANP
import play.api.libs.json.{Format, JsString, JsSuccess, JsValue, Json}


case object ANP extends Enumeration {
  type ANP = Value
  val A, E, N = Value

  implicit val myEnumFormat = new Format[ANP] {
    def reads(json: JsValue) = JsSuccess(ANP.withName(json.as[String]))

    def writes(myEnum: ANP) = JsString(myEnum.toString)
  }
}

case class Address(line1: String, line2: Option[String], line3: Option[String], city: String, state: String, zip: String, phone: Option[String])

case object Address {
  implicit val format = Json.format[Address]
}

case class Location(address: Address, anp: ANP)

case object Location {
  implicit val anpFormat = ANP.myEnumFormat
  implicit val format = Json.format[Location]
}


case class Provider(id: String, name: String, specialty: String, locations: Seq[Location])

case object Provider {

  implicit val format = Json.format[Provider]

  lazy val allProviders = Seq(
    Provider("1", "Baily, Tanya J, MD", "Pediatrics", Seq(
      Location(Address("12720 Bass Lake Rd", Some("Maple Grove"), None, "", "MN", "55369", Some("(001) 234-4356")), ANP.A),
      Location(Address("12720 Home2Hospitals", Some("Maple Grove"), None, "", "MN", "55369", Some("(001) 654-6456")), ANP.A)
    )),
    Provider("2", "Srini, Ch J, MD", "Family Medicine", Seq(
      Location(Address("12720 Home2Hospitals", Some("Maple Grove"), None, "", "MN", "55369", Some("(001) 654-6456")), ANP.A)
    )),
    Provider("3", "Jimmy, Kimmel R, MD", "Cardiac Surgeon", Seq(
      Location(Address("12720 Home2Hospitals", Some("Maple Grove"), None, "", "MN", "55369", Some("(001) 534-4566")), ANP.A),
      Location(Address("12720 Home2Hospitals", Some("Maple Grove"), None, "", "MN", "55369", Some("(001) 654-6456")), ANP.A)
    )),
    Provider("4", "Stephen, Colbert R", "Nurse Practitioner", Seq(
      Location(Address("12720 YenkayyaHospitals", Some("Duck Grove"), None, "", "MN", "55369", Some("(001) 788-6456")), ANP.A)
    )),
    Provider("5", "Trevor, Noah G, MD", "Pediatrics", Seq(
      Location(Address("12720 YenkayyaHospitals", Some("Falcon Grove"), None, "", "MN", "55369", Some("(001) 788-6456")), ANP.A),
      Location(Address("12720 AppleHospitals", Some("Chick Grove"), None, "", "MN", "43534", Some("(001) 677-7676")), ANP.A)
    )),
    Provider("7", "Ellen, Degenres C, MD", "Gastro Enterologist", Seq(
      Location(Address("12720 AppleHospitals", Some("Chick Grove"), None, "", "MN", "43534", Some("(001) 677-7676")), ANP.A),
      Location(Address("12720 YenkayyaHospitals", Some("Bald Grove"), None, "", "MN", "55369", Some("(001) 788-6456")), ANP.A)
    )),
    Provider("1", "Dwyane, Johnson G", "Nurse Practitioner", Seq(
      Location(Address("12720 YenkayyaHospitals", Some("Bald Grove"), None, "", "MN", "55369", Some("(001) 788-6456")), ANP.A)
    )),
    Provider("1", "Sandra, Bulluck", "Internal Medicine", Seq(
      Location(Address("12720 NasirakamHospitals", Some("Goose Grove"), None, "", "MN", "55369", Some("(001) 788-6456")), ANP.A)
    )),

  )
}
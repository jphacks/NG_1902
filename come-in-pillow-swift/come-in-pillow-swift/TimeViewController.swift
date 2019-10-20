//
//  TimeViewController.swift
//  come-in-pillow-swift
//
//  Created by yuna on 2019/10/20.
//  Copyright © 2019 yuna. All rights reserved.
//

import Foundation
import UIKit

var datePicker: UIDatePicker = UIDatePicker()


class TimeViewController: UIViewController {
    
    @IBOutlet weak var timeLabel: UILabel!
    
    
    @IBAction func changeDate(_ sender: UIDatePicker) {
        let formatter1 = DateFormatter()
        formatter1.dateFormat = "HH時間 mm分"
        timeLabel.text = formatter1.string(from: sender.date)
  
    }
    
    @IBAction func sendDate(){
        let formatter2 = DateFormatter()
        formatter2.dateFormat = "mm"
        
        guard let url = URL(string: "http://192.168.100.140:5000/?mins=" + formatter2.string(from: datePicker.date))else{
//        guard let url = URL(string: "http://google.com")else{
//
        return
          }
        /*
          urlComponents.queryItems = [
            URLQueryItem(name: "mins", value: "1"),
        ]*/
        URLSession.shared.dataTask(with: url){(data, response, error) in if error != nil{print(error!.localizedDescription)
           
            }
            
            guard let data = data else {return}
        }.resume()
        
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
    }
     
    
}

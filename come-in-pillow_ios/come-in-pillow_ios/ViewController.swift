//
//  ViewController.swift
//  come-in-pillow_ios
//
//  Created by yuna on 2019/10/19.
//  Copyright © 2019 yuna. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet var TestButton: UIButton!

    @IBAction func goNext(_ sender:UIButton) {
        let next = storyboard!.instantiateViewController(withIdentifier: "LoginView")
        self.present(next,animated: true, completion: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

